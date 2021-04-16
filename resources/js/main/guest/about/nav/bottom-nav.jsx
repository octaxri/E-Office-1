import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const BottomNavbar = ({theme}) => {

    const curUrl = useLocation().pathname;

    const active = (to) => {
        const match = matchPath(curUrl, {
            path: to,
            exact: true,
            strict: false
        });
        return (match)
    }

    useEffect(()=>{
        // console.log(theme)
    }, [])

    const route = ({to, icon, name, key}) => {
        return (
            <NavLink key={key} exact to={to} className={`col h-100 py-3 align-content-center d-flex justify-content-center bottom-nav ${active(to) ? theme : null }`}>
                <h3 className={`my-auto text-uppercase text-center ls-1 ${active(to) ? 'text-white' : 'text-darker' }`}>
                    <i className={`${icon} my-auto bottom-nav-icon ${active(to) ? 'text-white' : 'text-muted' }`} style={{fontSize:'1.2rem'}}></i><br/>
                    <span className="d-lg-block d-none">{name}</span>
                </h3>
            </NavLink>
        )
    }

    const lists = [
        {
            to: '/',
            icon: 'las la-home',
            name: 'home'
        },
        {
            to: '/about/me',
            icon: 'lar la-user',
            name: 'myself'
        },
        {
            to: '/about/education',
            icon: 'las la-university',
            name: 'education'
        },
        {
            to: '/about/skills',
            icon: 'las la-laptop-code',
            name: 'skills'
        },
        {
            to: '/about/projects',
            icon: 'las la-poll',
            name: 'projects'
        },
        {
            to: '/about/resume',
            icon: 'las la-file',
            name: 'resume'
        }
    ]

    // const LinkActive = {
    //     color: "white",
    //     backgroundColor: "#f4bc51"
    // }

    return (
        <>
            <div style={{height:'80px'}}>
                <div className="container-fluid position-fixed bottom-0 bg-white">
                    <div className="row shadow h-100">
                        {
                            lists.map((list, key) => (
                                route({
                                    to: list.to,
                                    icon: list.icon,
                                    name: list.name,
                                    key: key
                                })
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomNavbar
