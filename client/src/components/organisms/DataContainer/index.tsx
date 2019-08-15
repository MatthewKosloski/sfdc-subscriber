import React, { Fragment } from 'react';

import NoDataNotice from './NoDataNotice';

interface DataContainerProps {
	hasData?: boolean,
	noDataText?: string
}

const DataContainer: React.FC<DataContainerProps> = ({hasData, noDataText,
	children}) => {
		return hasData
			? <Fragment>{children}</Fragment>
			: <NoDataNotice>{noDataText}</NoDataNotice>;
};

DataContainer.defaultProps = {
	hasData: false,
	noDataText: 'No data to show.'
};

export default DataContainer;