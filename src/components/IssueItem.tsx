import * as React from "react";
import "./RepoItem.css";
import "./IssueItem.css";
import { shorten } from "../utils/stringUtils";
import { Item } from "../models/Search";

interface Props {
  issue: Item;
  name: String;
}

export const IssueItem: React.SFC<Props> = props => {
  const pluralizedComments =
    props.issue.comments === 1 ? "comment" : "comments";
  return (
    <div className="issue">
      <h3> {props.name}</h3>
      <span className="title"> {props.issue.title}</span>
      <br /> ({props.issue.comments} {pluralizedComments})
      <p>{shorten(props.issue.body)}</p>
    </div>
  );
};
