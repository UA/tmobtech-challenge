import * as React from 'react';
import './RepoItem.css';
import { Repo } from '../models/Repo';
import { Link } from "react-router-dom";

interface Props {
    repo: Repo;
}

export const RepoItem: React.SFC<Props> = props => {
    return (
        <div className="repo">
           <ul className="collection hoverable">
			<li className="collection-item avatar grey darken-1 black-text">
				<p className="title">
                   <Link className="black-text" to={"/repoDetail/"+props.repo.name}>{props.repo.name}</Link>
				</p>
                <p className="description">
					{props.repo.description}
				</p>
				<p>
				</p>
				<p>
                    <i className="fa fa-star material-icons" aria-hidden="true" /> {props.repo.language} {"  |  "}
                    <i className="fa fa-star material-icons" aria-hidden="true" /> {props.repo.stargazers_count} {"  |  "}
                    <i className="fa fa-star material-icons" aria-hidden="true" /> {props.repo.forks_count} {"  |  "}
                    <i className="fa fa-star material-icons" aria-hidden="true" /> {props.repo.open_issues_count} {"  |  "}
                    <i className="fa fa-eye material-icons" aria-hidden="true" /> {props.repo.watchers_count}
                </p>
			</li>
		</ul>
        </div>
    );
};
