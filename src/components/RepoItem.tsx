import * as React from "react";
import "./RepoItem.css";
import { Repo } from "../models/Repo";
import { Link } from "react-router-dom";
import moment from "moment";

interface Props {
  repo: Repo;
}

export const RepoItem: React.SFC<Props> = props => {
  let license;
  props.repo.license != null
    ? (license = (
        <i className="fa fa-balance-scale material-icons" aria-hidden="true" />
      ))
    : (license = "");
  return (
    <div className="repo">
      <ul>
        <li>
          <p className="title">
            <Link to={"/repoDetail/" + props.repo.name}>{props.repo.name}</Link>
          </p>
          <p className="description">{props.repo.description}</p>
          <p>
            <i
              className="fa fa-circle material-icons"
              aria-hidden="true"
              style={{ color: "#f1e05a" }}
            />{" "}
            {props.repo.language} {"  |  "}
            {license}{" "}
            {props.repo.license != null
              ? props.repo.license.spdx_id + "  |  "
              : ""}
            <i
              className="fa fa-code-branch material-icons"
              aria-hidden="true"
            />{" "}
            {props.repo.forks_count} {"  |  "}
            <i className="fa fa-star material-icons" aria-hidden="true" />{" "}
            {props.repo.stargazers_count} {"  |  "}
            <i
              className="fa fa-info-circle material-icons"
              aria-hidden="true"
            />{" "}
            {props.repo.open_issues_count} {"  |  "}
            Updated {moment(props.repo.updated_at).fromNow()}
          </p>
        </li>
      </ul>
    </div>
  );
};
