import React from 'react'
import ArrowRight from '@material-ui/icons/ArrowRight';
import './sidebar.css'
const SidebarIcons = ({arrow,icon,label,active}) => {
    return (
        <div className={`sidebar-icons ${active&&'active'}`}>
            <div className="siderbar-item-arrow">
                    {arrow && <ArrowRight/>}
                </div>
                <div className={`sidebar-item-main ${arrow?'arrow':'no-arrow'}`}>
                    {icon}
                    <p>{label}</p>
                </div>
        </div>
    )
}

export default SidebarIcons
