// Mains & Types
import React, { Fragment, useState } from 'react';
import { State } from '../../types';
// Translation
import tr from './list_setting.tr.json';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid'
// Icons
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
// Redux
import store from '../../redux/store';
import { useSelector } from 'react-redux';
// Actions
import { modifySupport } from '../../redux/actions/supportAction';

// @@ Supportive
const Lists: React.FC = () => {
  const {language, support} = useSelector((state: State) => state);
  const ln = language;

  const AscDescMenuItems = <Fragment>
    <MenuItem value='asc'>{tr.asc[ln]}</MenuItem>
    <MenuItem value='desc'>{tr.desc[ln]}</MenuItem>
  </Fragment>
  
  return (
    <Grid style={{display: 'flex', textAlign: 'center'}}>
      <InputLabel id="wordOrder">{tr.wordOrder[ln]}</InputLabel>
        <Select
          value={support.wordOrderPref}
          onChange={(e) => store.dispatch(modifySupport({ wordOrderPref: e.target.value }))}
        >
          <MenuItem value='asc'>{tr.asc[ln]}</MenuItem>
          <MenuItem value='desc'>{tr.desc[ln]}</MenuItem>
        </Select>
      <InputLabel id="yearOrder">{tr.yearOrder[ln]}</InputLabel>
      <Select
        value={support.yearOrderPref}
        onChange={(e) => store.dispatch(modifySupport({ yearOrderPref: e.target.value }))}
      >
        <MenuItem value='asc'>{tr.asc[ln]}</MenuItem>
        <MenuItem value='desc'>{tr.desc[ln]}</MenuItem>
      </Select>
      <InputLabel id="wordListingType">{tr.wordDispalyType[ln]}</InputLabel>
      <Select
        value={support.wordDisplayPref}
        onChange={(e) => store.dispatch(modifySupport({ wordDisplayPref: e.target.value }))}
      >
        <MenuItem value='wordcard'>{tr.wordcard[ln]}</MenuItem>
        <MenuItem value='list'>{tr.list[ln]}</MenuItem>
      </Select>
    </Grid>
  )
}

// @@ MAIN
const ListSetting: React.FC = () => {
  const [isShowing, setShowing] = useState<boolean>(false);

  return (
    <Fragment>
      {isShowing
        ? (
          <Lists />
        )
        : (
          <IconButton style={{ float:'right',textAlign:'right'}} onClick={() => setShowing(true)}>
            <TuneOutlinedIcon />
          </IconButton>
        )
      }
    </Fragment>
  )
};

export default ListSetting;