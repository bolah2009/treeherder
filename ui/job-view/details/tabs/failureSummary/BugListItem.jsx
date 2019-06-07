import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

import { getSearchWords } from '../../../../helpers/display';
import { getBugUrl } from '../../../../helpers/url';
import { withPinnedJobs } from '../../../context/PinnedJobs';

function BugListItem(props) {
  const { bug, suggestion, bugClassName, title, selectedJob, addBug } = props;
  const bugUrl = getBugUrl(bug.id);

  return (
    <li>
      <button
        className="btn btn-xs btn-light-bordered"
        type="button"
        onClick={() => addBug(bug, selectedJob)}
        title="add to list of bugs to associate with all pinned jobs"
      >
        <FontAwesomeIcon icon={faThumbtack} title="Select bug" />
      </button>
      <a
        className={`${bugClassName} ml-1`}
        href={bugUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      >
        {bug.id}
        <Highlighter
          className={`${bugClassName} ml-1`}
          searchWords={getSearchWords(suggestion.search)}
          textToHighlight={bug.summary}
          caseSensitive
          highlightTag="strong"
        />
      </a>
    </li>
  );
}

BugListItem.propTypes = {
  bug: PropTypes.object.isRequired,
  suggestion: PropTypes.object.isRequired,
  addBug: PropTypes.func.isRequired,
  selectedJob: PropTypes.object.isRequired,
  bugClassName: PropTypes.string,
  title: PropTypes.string,
};

BugListItem.defaultProps = {
  bugClassName: '',
  title: null,
};

const mapStateToProps = ({ selectedJob: { selectedJob } }) => ({ selectedJob });

export default connect(mapStateToProps)(withPinnedJobs(BugListItem));
