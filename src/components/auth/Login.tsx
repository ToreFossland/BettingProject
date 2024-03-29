import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Background from '../../soccer.jpg';

import { connect } from 'react-redux';
import { login, register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import { ILoginModal, ITarget, IAuthReduxProps } from '../../types/interfaces';
import { useHistory } from "react-router-dom";

const images = [
  {
    url: '../soccer.jpg',
    title: 'Log In',
    width: '50%',
  },
  {
    url: '../soccer.jpg',
    title: 'Register',
    width: '50%',
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    justifyContent: "center",
  },
  image: {
    position: 'relative',
    height: "93vh",
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoginModal = ({
  isAuthenticated,
  error,
  login,
  register,
  clearErrors
}: ILoginModal) => {
  const classes = useStyles();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  let history = useHistory();

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleOpen = useCallback((title: string) => {
    clearErrors();
    if (title === 'Log In') {
      setOpenLogin(true);
    } else if (title === 'Register') {
      setOpenRegister(true);
    }
  }, [clearErrors, openLogin, openRegister]);

  const handleClose = useCallback(() => {
    clearErrors();
    setOpenLogin(false);
    setOpenRegister(false);
  }, [clearErrors, openLogin, openRegister]);

  const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
  const handleChangePassword = (e: ITarget) => setPassword(e.target.value);
  const handleChangeUsername = (e: ITarget) => setUsername(e.target.value);
  const handleChangePasswordCheck = (e: ITarget) => setPasswordCheck(e.target.value);


  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (passwordCheck === '') {
      // Attempt to login
      const user = { email, password };
      login(user);
    }
    else {
      //Atemt to register user
      const user = { email, username, password, passwordCheck };
      register(user);
    }
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL' || error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
      setAlertOpen(true)
    } else {
      setMsg(null);
    }
    // If authenticated, close modal
    if (openLogin || openRegister) {
      if (isAuthenticated) {
        handleClose();
        history.push("/home")
      }
    }
  }, [error, handleClose, isAuthenticated, openLogin, openRegister]);

  return (
    <div className={classes.root}>
      {images.map((image: any) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          onClick={() => handleOpen(image.title)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${Background})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openLogin}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openLogin}>
          <form className={classes.paper} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Email" onChange={handleChangeEmail} />
            <TextField id="standard-basic" label="Password" type="password" onChange={handleChangePassword} />


            <button type="button" onClick={handleOnSubmit}>
              Login
                </button>

          </form>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRegister}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRegister}>
          <form className={classes.paper} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Username" onChange={handleChangeUsername} />
            <TextField id="standard-basic" label="Email" onChange={handleChangeEmail} />
            <TextField id="standard-basic" label="Password" type="password" onChange={handleChangePassword} />
            <TextField id="standard-basic" label="Verify password" type="password" onChange={handleChangePasswordCheck} />
            <button type="button" onClick={handleOnSubmit}>
              Register
              </button>
          </form>
        </Fade>
      </Modal>
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You have redcived an error!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = { login, register, clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);