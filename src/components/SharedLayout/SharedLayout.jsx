import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import SideBar from "../SideBar/SideBar";
import Workspace from "../Workspace/Workspace";
import { useTheme } from "@mui/material/styles";
import css from "./SharedLayout.module.css";

export default function SharedLayout() {
  const theme = useTheme();

  return (
    <div
      className={css.mainContainer}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <SideBar />
      <Workspace>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Workspace>
    </div>
  );
}
