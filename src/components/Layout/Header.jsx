
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Grid, Stack } from "@mui/material";
import classNames from "classnames";
import { logout, setIsLogin, setUserInfo } from "lib/features/userSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  BorderColor,
  DescriptionOutlined,
  DnsOutlined,
  KeyboardArrowDown,
  Logout,
  MenuOutlined,
  MiscellaneousServicesOutlined,
  PasswordOutlined,
  SettingsOutlined,
  SnippetFolderOutlined,
  TextSnippet,
} from "@mui/icons-material";
import { USER_ROLE, imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { redirectTo } from "src/helper/common";
import { getSessionFromCookies } from "src/services/authService";
import styles from "./styles.module.scss";

const domain = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;



const userMenu = {
  [USER_ROLE.candidate]: [
    {
      icon: <TextSnippet />,
      label: "Quản lý hồ sơ",
      link: `${routeMap.file}${routeMap.dashboard}`,
    },
    {
      icon: <DescriptionOutlined />,
      label: "Danh sách CV",
      link: `${routeMap.file}${routeMap.cv}`,
    },
    {
      icon: <SnippetFolderOutlined />,
      label: "Việc làm đã lưu",
      link: `${routeMap.file}${routeMap.savedJob}`,
    },
    {
      icon: <PasswordOutlined />,
      label: "Đổi mật khẩu",
      link: `${routeMap.file}${routeMap.changePassword}`,
    },
  ],
  [USER_ROLE.employer]: [
    {
      icon: <SettingsOutlined />,
      label: "Thông tin chung",
      link: `${routeMap.employer}${routeMap.dashboard}`,
    },
    {
      icon: <BorderColor />,
      label: "Đăng tin tuyển dụng",
      link: `${routeMap.employer}${routeMap.createJob}`,
    },
    {
      icon: <DnsOutlined />,
      label: "Quản lý tin tuyển dụng",
      link: `${routeMap.employer}${routeMap.postList}`,
    },
    {
      icon: <MiscellaneousServicesOutlined />,
      label: "Quản lý dịch vụ",
      link: `${routeMap.employer}${routeMap.packageManage}`,
    },
    {
      icon: <PasswordOutlined />,
      label: "Đổi mật khẩu",
      link: `${routeMap.employer}${routeMap.changePassword}`,
    },
  ],
};


const menuItems = [
  {
    label: "Việc làm",
    link: `${routeMap.job}/viec-lam-hot`,
    role: USER_ROLE.all,
  },
  { label: "Công ty", link: routeMap.company, role: USER_ROLE.all },
  { label: "Ứng viên", link: routeMap.candidate, role: USER_ROLE.employer },
  { label: "Bảng giá", link: routeMap.package, role: USER_ROLE.all },
];


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogin, userInfo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    window.location.href = domain;
  };

  const redirectMenu = (pathname) => {
    window.open(`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}${pathname}`);
  };

  useEffect(() => {
    const session = getSessionFromCookies();
    dispatch(setIsLogin(session.isLoggedIn));
    if (session.isLoggedIn) {
      dispatch(setUserInfo(session.userInfo));
    }
  }, []);

  return (
    <div
      className={classNames([
        "h-16 fixed top-0 left-0 z-10 flex content-center lg:px-10 bg-bgHeader w-full",
        styles.header,
      ])}
    >
      <div className="relative w-full">
        <Grid
          container
          alignItems="center"
          alignContent="center"
          spacing={{ xs: 0, lg: 1 }}
          className="text-33"
        >
          <Grid item xs={12} lg="auto">
            <div
              className="cursor-pointer p-3 lg:p-0 w-fit"
              onClick={() => redirectTo("")}
            >
              <Image
                src={"/images/Hilead logo be.png" || imageError}
                alt="logo"
                width={112}
                height={41}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            lg="auto"
            className={classNames(
              "!flex-1 w-full left-0 lg:left-auto absolute top-16 lg:relative lg:top-0 bg-white lg:!visible",
              showMenu ? "visible" : "invisible"
            )}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={{ xs: 0, lg: 2 }}
              className="w-full"
            >
              <Grid item xs={12} lg="auto">
                <Grid container>
                  {menuItems?.map(
                    (item, i) =>
                      (item?.role === USER_ROLE.all ||
                        item?.role === userInfo?.role) && (
                        <Grid item xs={12} lg="auto" key={i}>
                          <div
                            className={classNames([
                              "hover:bg-secondary hover:text-white px-4 uppercase font-semibold cursor-pointer text-xs h-16 flex items-center",
                              item?.link === pathname &&
                              "bg-secondary text-white",
                            ])}
                          >
                            {item?.label}
                          </div>
                        </Grid>
                      )
                  )}
                  <Grid item xs={12} lg="auto">
                    <div
                      className={classNames([
                        "bg-secondary text-white px-4 uppercase font-semibold cursor-pointer text-xs h-16 flex items-center",
                      ])}
                    >
                      Khách hàng tiềm năng
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {isLogin === false && (
                <Grid
                  item
                  xs={12}
                  lg="auto"
                  className="text-white font-semibold"
                  justify="center"
                >
                  <Grid container>
                    <Grid item xs={12} lg="auto">
                      <div
                        className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer"
                        onClick={() => redirectMenu(routeMap.login)}
                      >
                        <span className="text-sm">Đăng nhập</span>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg="auto">
                      <div
                        className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer"
                        onClick={() => redirectMenu(routeMap.register)}
                      >
                        <span className="text-sm te">Đăng ký</span>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {isLogin && (
                <Grid item xs={12} lg="auto">
                  <div
                    className={classNames(
                      "hover:bg-secondary hover:text-white text-33 cursor-pointer relative px-4 lg:px-2",
                      styles.acc
                    )}
                  >
                    <div
                      className={classNames(
                        "text-sm font-semibold uppercase",
                        styles.item
                      )}
                    >
                      Tài khoản <KeyboardArrowDown />
                    </div>
                    <div
                      className={classNames(
                        "hidden absolute bg-white text-33 top-[64px] right-0 w-[200px] border",
                        styles.accMenu
                      )}
                    >
                      <Stack>
                        {userMenu?.[userInfo?.role]?.map((item, i) => (
                          <div
                            onClick={() => redirectMenu(item.link)}
                            className="text-sm hover:text-primary p-2 border-b hover:bg-ee"
                            key={i}
                          >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                          </div>
                        ))}
                        <div
                          onClick={handleLogout}
                          className="text-sm hover:text-primary p-2 hover:bg-ee"
                        >
                          <Logout />
                          <span className="ml-2">Đăng xuất</span>
                        </div>
                      </Stack>
                    </div>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <MenuOutlined
          fontSize="large"
          className="absolute top-4 right-3 cursor-pointer lg:!hidden"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
    </div>
  )
}
