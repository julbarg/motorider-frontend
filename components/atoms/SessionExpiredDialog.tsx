import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type SessionExpiredDialogProps = {
  onClick: () => {}
}

export const SessionExpiredDialog: React.FC<SessionExpiredDialogProps> = (
  props
) => {
  return (
    <Dialog disableEscapeKeyDown={true} onClose={props.onClick} open={true}>
      <DialogTitle id="alert-dialog-title">Session Expired</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sign In to continue
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ my: 2 }} onClick={props.onClick} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
