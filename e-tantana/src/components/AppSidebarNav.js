import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";
import api from "../const/api";
import { useState } from "react";
import { useEffect } from "react";

export const AppSidebarNav = ({ items }) => {
  const [loggedHierarchy, setLoggedHierarchy] = useState("");
  const [loggedActivityField, setLoggedActivityField] = useState(null);

  useEffect(() => {
    getActivityField();
  }, []);

  const getActivityField = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    fetch(api(`activityFields/${user.activity_field_id}`))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setLoggedHierarchy(data.activityField.hierarchy.name);
        setLoggedActivityField(data.activityField);
      });
  };

  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    if (item.show) {
      if (
        item.access <= user.accountType &&
        item.show.includes(loggedHierarchy)
      )
        return (
          <Component
            {...(rest.to &&
              !rest.items && {
                component: NavLink,
              })}
            key={index}
            {...rest}
          >
            {navLink(name, icon, badge)}
          </Component>
        );
    } else {
      if (item.access <= user.accountType)
        return (
          <Component
            {...(rest.to &&
              !rest.items && {
                component: NavLink,
              })}
            key={index}
            {...rest}
          >
            {navLink(name, icon, badge)}
          </Component>
        );
    }
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    if (item.show) {
      if (
        item.access <= user.accountType &&
        item.show.includes(loggedHierarchy)
      )
        return (
          <Component
            idx={String(index)}
            key={index}
            toggler={navLink(name, icon)}
            visible={location.pathname.startsWith(to)}
            {...rest}
          >
            {item.items?.map((item, index) =>
              item.items ? navGroup(item, index) : navItem(item, index)
            )}
          </Component>
        );
    } else {
      if (item.access <= user.accountType)
        return (
          <Component
            idx={String(index)}
            key={index}
            toggler={navLink(name, icon)}
            visible={location.pathname.startsWith(to)}
            {...rest}
          >
            {item.items?.map((item, index) =>
              item.items ? navGroup(item, index) : navItem(item, index)
            )}
          </Component>
        );
    }
  };
  const navTitle = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    if (item.access <= user.accountType)
      return (
        <>
          <Component
            {...(rest.to &&
              !rest.items && {
                component: NavLink,
              })}
            key={index}
            {...rest}
          >
            {navLink(name, icon, badge)}
          </Component>
          {item.menu.map((item, index) =>
            item.items ? navGroup(item, index) : navItem(item, index)
          )}
        </>
      );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((itemList, index) =>
          itemList.map((item, index) => navTitle(item, index))
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
