import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import PoweroffOutlined from "@ant-design/icons/PoweroffOutlined";
import Typography from "@mui/material/Typography";
import deviceImg from "assets/images/device/screen.png";
import { Box } from "@mui/system";
import { Button, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeviceContainer({ open, setOpen, device }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Device : {device}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              alignContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                width: "70%",
              }}
            >
              <Box sx={{ padding: "5px 5px 5px 3px" }}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Reboot
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Lock
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Dim Display
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Volume
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Volume
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Mute Volume
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Screenshot
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    variant="outlined"
                    size="small"
                    startIcon={<PoweroffOutlined />}
                  >
                    Open Debug Menu
                  </Button>
                </Stack>
              </Box>
              <Box
                component="img"
                alt="The house from the offer."
                src={deviceImg}
              />
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                padding: "5px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flex: 1,
              }}
            ></Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
