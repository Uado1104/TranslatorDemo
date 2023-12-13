import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { GoogleTranslator } from './TestTranslate';
// import googleTranslateApi from 'google-translate-cn-api';

export async function translate(text: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const answer = '带翻译';
    // const answer = googleTranslateApi(text);
    resolve(answer);
  });
}

interface ContextState {
  text: string;
}

const MyContext = React.createContext<Partial<ContextState>>({});

type language = 'en' | 'ja' | 'ko';
const languageMap: Record<language, string> = {
  en: '英文',
  ja: '日文',
  ko: '韩文',
};


interface TestContextState {
  text: string;
  targetLanguage: language;
  translation: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export class TestTranslator extends React.Component<unknown, TestContextState> {
  private MyTranslator: GoogleTranslator = new GoogleTranslator('en', 'auto');

  constructor(props: unknown) {
    super(props);
    this.state = {
      text: '',
      targetLanguage: 'en',
      translation: '',
    };

  }

  readonly handleChange = (event: React.SyntheticEvent, newValue: string) => {
    this.setState({
      targetLanguage: newValue as language,
    });
  };


  RenderTranslation(): JSX.Element {
    return (
      <Stack>
         <Tabs value={this.state.targetLanguage} onChange={this.handleChange} aria-label="basic tabs example">
            <Tab label={languageMap.en} {...a11yProps(0)} />
            <Tab label={languageMap.ja} {...a11yProps(1)} />
            <Tab label={languageMap.ko} {...a11yProps(2)} />
        </Tabs>
        <TextField label="译文" disabled={true} sx={{ margin: 1 }} value={this.state.translation} />  
      </Stack>
    )
  }
  

  onChangeContext = (name: string) => {
    this.setState({
      text: '',
      translation: '',
    });
  };

  onTranslate = (text: string) => {
    this.setState({
      translation: text,
    });
    this.MyTranslator.translateText(text).then((resp) => {
      this.setState({
        translation: resp,
      });
    });
  };

  render() {
    return (
      <div>
        <MyContext.Provider value={{text: this.state.text}}>
          <Grid>
            <TextField label="原文" sx={{ margin: 1 }} onChange={(e) => this.onTranslate(e.target.value)} />
            {this.RenderTranslation()}
          </Grid>          
        </MyContext.Provider>
      </div>
    );
  }
}

// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Zoom from '@material-ui/core/Zoom';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import UpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { green } from '@material-ui/core/colors';
// import Box from '@material-ui/core/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`action-tabpanel-${index}`}
//       aria-labelledby={`action-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index: number) {
//   return {
//     id: `action-tab-${index}`,
//     'aria-controls': `action-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//     position: 'relative',
//     minHeight: 200,
//   },
//   fab: {
//     position: 'absolute',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   fabGreen: {
//     color: theme.palette.common.white,
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[600],
//     },
//   },
// }));

// export default function FloatingActionButtonZoom() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   const transitionDuration = {
//     enter: theme.transitions.duration.enteringScreen,
//     exit: theme.transitions.duration.leavingScreen,
//   };

//   const fabs = [
//     {
//       color: 'primary',
//       className: classes.fab,
//       icon: <AddIcon />,
//       label: 'Add',
//     },
//     {
//       color: 'secondary',
//       className: classes.fab,
//       icon: <EditIcon />,
//       label: 'Edit',
//     },
//     {
//       color: 'inherit',
//       className: clsx(classes.fab, classes.fabGreen),
//       icon: <UpIcon />,
//       label: 'Expand',
//     },
//   ];

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" color="default">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="action tabs example"
//         >
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2} dir={theme.direction}>
//           Item Three
//         </TabPanel>
//       </SwipeableViews>
//       {fabs.map((fab, index) => (
//         <Zoom
//           key={fab.color}
//           in={value === index}
//           timeout={transitionDuration}
//           style={{
//             transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
//           }}
//           unmountOnExit
//         >
//           <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
//             {fab.icon}
//           </Fab>
//         </Zoom>
//       ))}
//     </div>
//   );
// }
