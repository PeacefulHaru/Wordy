// Main
import express, {   Request, Response } from 'express';
import dotenv from 'dotenv';
// Type
import { Resource } from '../../../type/resourceType';
import { OkrGetOkrObjectInput, OkrGetOkrObjectPayload } from 'src/type/payloadType';
import { pathFinder, WordyEvent, EventType } from '../../../type/wordyEventType';
// Middleware
import { openToPublic, addValidatedByThisService } from '../../middleware/onlyToMdl';
// Mogno DB
import { OkrObjectModel } from '../../../models/EncryptedResource';
// internal
import { ctGateway } from '../../../internal/management/cloudTrail';
import { intoPayload } from '../../../internal/compute/backendWambda';
// Gateway
import { connectToMongoDB } from '../../../internal/database/mongo';
// Router
const router = express.Router();
const EVENT_TYPE: EventType = "okr:getOkrObject";
dotenv.config();

// Only available to Wordy Members
router.use(openToPublic); 
router.use(connectToMongoDB);
router.use(addValidatedByThisService);

router.post(pathFinder(EVENT_TYPE), async (req: Request, res: Response) => {
  // Declare + Save Record
  const RE = req.body as WordyEvent;
  const { containingObject } = RE.requesterInputData as OkrGetOkrObjectInput;

  // Findt data from database
  const okrObjects = await OkrObjectModel.find().where("wrn").in(containingObject) as Resource[]; // returns null when not found

  if (!okrObjects) {
    const sending = ctGateway(RE, "LogicallyDenied");
    return res.status(sending.status!).send(sending);
  };

  // Found the objects (Encrypted)
  // decrypt the data
  RE.payload = okrObjects.map(el => intoPayload(el, RE)) as OkrGetOkrObjectPayload;
  const sending = ctGateway(RE, "Accepted");
  return res.status(sending.status!).send(sending);
  
});

export default router;