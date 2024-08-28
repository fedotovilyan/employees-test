import { FC } from "react";
import cls from "./Breadcrumbs.module.scss";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

export interface BreadcrumbsItem {
  key: string | number;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  className?: string;
  items: BreadcrumbsItem[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { items, className } = props;
  const {pathname} = useLocation();

  return (
    <div className={classNames(cls.breadcrumbs, className)}>
      {items.map((item, index) => (
        <div key={item.key} className={cls.item}>
          {index !== 0 && <div className={cls.divider}>/</div>}
          <Link
            className={classNames({
              [cls.label]: true,
              [cls.active]: pathname === item.href || item.active,
            })}
            onClick={item.onClick}
            to={item.href || ""}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
};
