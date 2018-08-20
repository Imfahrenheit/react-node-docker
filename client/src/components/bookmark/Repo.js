import React from 'react'
import {  Icon} from "semantic-ui-react";

const Repo = (props) => {
    const{item}=props
  return <div className="repo_card">
      <div style={{ width: "50%", textAlign: "left", fontWeight: "bold" }}>
        {item.name}
      </div>

      <span style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
        {item.forks&&<span>
          
          <Icon name="fork" /> {item.forks}
        </span>}
        <span style={{ cursor: "pointer", marginLeft: "13px" }}>
          <a href={item.url} target="_blank">
            <Icon name="github" />
          </a>
        </span>

        <span style={{ cursor: "pointer", marginLeft: "13px" }}
        onClick={()=>props.addBookmark(item)}>
          bookmark
          <Icon name="bookmark" />
        </span>
      </span>
    </div>;
}

export default Repo
