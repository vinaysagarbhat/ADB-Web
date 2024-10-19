import PropTypes from "prop-types";
import axios from "axios";
// material-ui
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import RightCircleOutlined from "@ant-design/icons/RightCircleOutlined";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PoweroffOutlined from "@ant-design/icons/PoweroffOutlined";

// project import
import Dot from "components/@extended/Dot";
import { useEffect, useState } from "react";
import DeviceContainer from "../../components/DeviceContainer";
import { Badge } from "@mui/material";

const headCells = [
  {
    id: "sl_no",
    align: "left",
    disablePadding: false,
    label: "#",
  },
  {
    id: "device_id",
    align: "left",
    disablePadding: true,
    label: "Device ID",
  },
  {
    id: "model",
    align: "left",
    disablePadding: false,
    label: "Model",
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "battery",
    align: "left",
    disablePadding: false,
    label: "Battery",
  },
  {
    id: "display_brightness",
    align: "left",
    disablePadding: false,
    label: "Brightness",
  },
  {
    id: "actions",
    align: "left",
    disablePadding: false,
    label: "Actions",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function AdbDevicesTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function DeviceStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = "warning";
      title = "Offline";
      break;
    case 1:
      color = "success";
      title = "Online";
      break;
    default:
      color = "primary";
      title = "None";
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -15,
    top: 11,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const rebootAPI = (deviceSerial) => {
   (async () => await axios.post(
    "http://localhost:3001/api/adb/power/reboot",
    { deviceSerial },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ))()
};

// ==============================|| ADB DEVICES TABLE ||============================== //

export default function AdbDevicesTable() {
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getAdbDevives() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/adb/list-long"
        );
        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAdbDevives();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <AdbDevicesTableHead />
          <TableBody>
            {devices.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <>
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    tabIndex={-1}
                    key={index + 1}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <Link color="secondary"> {index + 1}</Link>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.model.replace("model:", "")}</TableCell>
                    <TableCell>
                      <DeviceStatus status={1} />
                    </TableCell>
                    <TableCell>
                      <StyledBadge
                        badgeContent={`${row.battery}%`}
                        color="primary"
                        overlap="circular"
                      >
                        <BatteryChargingFullIcon />
                      </StyledBadge>
                    </TableCell>
                    <TableCell>
                      <StyledBadge
                        badgeContent={`${row.brightness}%`}
                        color="primary"
                        overlap="circular"
                      >
                        <WbSunnyIcon />
                      </StyledBadge>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                      >
                        <Button
                          onClick={() => {
                            setOpen(true)
                          }}
                          variant="outlined"
                          size="small"
                          startIcon={<RightCircleOutlined />}
                        >
                          Connect
                        </Button>
                        <Button
                          onClick={() => {
                            rebootAPI(row.id)
                          }}
                          variant="outlined"
                          size="small"
                          startIcon={<PoweroffOutlined />}
                        >
                          Reboot
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <DeviceContainer
                    open={open}
                    setOpen={setOpen}
                    device={row.id}
                  />
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

AdbDevicesTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string,
};

DeviceStatus.propTypes = { status: PropTypes.number };
