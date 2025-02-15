import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const MyBreadcrumb = () => {
  const [pathList, setPathList] = useState([])

  const location = useLocation()

  useEffect(() => {
    if(location.pathname) {
        console.log("MyBreadcrumb component is mounted", location);
        const list = location.pathname.split('/')
        list.shift()
        list.shift()
        if(!list.includes('home')) {
            list.unshift('home')
        }
        setPathList(list)
    }
  }, [location.pathname])
  return (
    <Breadcrumb className="breadcrumb-section">
        {pathList.map((path, index) => {
            return (
                <BreadcrumbItem key={index}>
                    <Link  to={`/admin/${path}`} className="breadcrumb-item">{path}</Link>
                </BreadcrumbItem>
            )
        })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;