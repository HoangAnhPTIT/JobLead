
"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import classNames from "classnames";
import { logout, setIsLogin, setUserInfo } from "lib/features/userSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { USER_ROLE, imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { redirectTo } from "src/helper/common";
import { getSessionFromCookies } from "src/services/authService";
import MIcon from "src/components/common/MIcon";
import styles from "./styles.module.scss";

const domain = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;



const userMenu = {
  [USER_ROLE.candidate]: [
    {
      icon: <MIcon name="text_snippet" />,
      label: "Quản lý hồ sơ",
      link: `${routeMap.file}${routeMap.dashboard}`,
    },
    {
      icon: <MIcon name="description" />,
      label: "Danh sách CV",
      link: `${routeMap.file}${routeMap.cv}`,
    },
    {
      icon: <MIcon name="snippet_folder" />,
      label: "Việc làm đã lưu",
      link: `${routeMap.file}${routeMap.savedJob}`,
    },
    {
      icon: <MIcon name="password" />,
      label: "Đổi mật khẩu",
      link: `${routeMap.file}${routeMap.changePassword}`,
    },
  ],
  [USER_ROLE.employer]: [
    {
      icon: <MIcon name="settings" />,
      label: "Thông tin chung",
      link: `${routeMap.employer}${routeMap.dashboard}`,
    },
    {
      icon: <MIcon name="border_color" />,
      label: "Đăng tin tuyển dụng",
      link: `${routeMap.employer}${routeMap.createJob}`,
    },
    {
      icon: <MIcon name="dns" />,
      label: "Quản lý tin tuyển dụng",
      link: `${routeMap.employer}${routeMap.postList}`,
    },
    {
      icon: <MIcon name="miscellaneous_services" />,
      label: "Quản lý dịch vụ",
      link: `${routeMap.employer}${routeMap.packageManage}`,
    },
    {
      icon: <MIcon name="password" />,
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
        <div className="flex items-center text-33">
          <div className="w-full lg:w-auto">
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
          </div>
          <div
            className={classNames(
              "flex-1 w-full left-0 lg:left-auto absolute top-16 lg:relative lg:top-0 bg-white lg:!visible",
              showMenu ? "visible" : "invisible"
            )}
          >
            <div className="flex justify-between items-center w-full">
              <div className="w-full lg:w-auto">
                <div className="flex">
                  {menuItems?.map(
                    (item, i) =>
                      (item?.role === USER_ROLE.all ||
                        item?.role === userInfo?.role) && (
                        <div key={i} className="w-full lg:w-auto">
                          <div
                            className={classNames([
                              "hover:bg-secondary hover:text-white px-4 uppercase font-semibold cursor-pointer text-xs h-16 flex items-center",
                              item?.link === pathname &&
                              "bg-secondary text-white",
                            ])}
                          >
                            {item?.label}
                          </div>
                        </div>
                      )
                  )}
                  <div className="w-full lg:w-auto">
                    <div
                      className={classNames([
                        "bg-secondary text-white px-4 uppercase font-semibold cursor-pointer text-xs h-16 flex items-center",
                      ])}
                    >
                      Khách hàng tiềm năng
                    </div>
                  </div>
                </div>
              </div>
              {isLogin === false && (
                <div className="w-full lg:w-auto text-white font-semibold">
                  <div className="flex">
                    <div className="w-full lg:w-auto">
                      <div
                        className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer"
                        onClick={() => redirectMenu(routeMap.login)}
                      >
                        <span className="text-sm">Đăng nhập</span>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto">
                      <div
                        className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer"
                        onClick={() => redirectMenu(routeMap.register)}
                      >
                        <span className="text-sm te">Đăng ký</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isLogin && (
                <div className="w-full lg:w-auto">
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
                      Tài khoản <MIcon name="keyboard_arrow_down" />
                    </div>
                    <div
                      className={classNames(
                        "hidden absolute bg-white text-33 top-[64px] right-0 w-[200px] border",
                        styles.accMenu
                      )}
                    >
                      <div>
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
                          <MIcon name="logout" />
                          <span className="ml-2">Đăng xuất</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <MIcon
          name="menu"
          className="absolute top-4 right-3 cursor-pointer lg:!hidden text-[28px]"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
    </div>
  )
}
