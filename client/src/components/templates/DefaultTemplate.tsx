import React,  { FunctionComponent, Fragment } from 'react';

import { Row, Column } from '../../design-system/layout';
import { Main } from '../../components';

interface Props {
	headerComponent?: React.ReactElement
	topComponent?: React.ReactElement,
	bottomLeftComponent?: React.ReactElement,
	bottomRightComponent?: React.ReactElement,
	sidebarComponent?: React.ReactElement
}

const DefaultTemplate: FunctionComponent<Props> = ({headerComponent, topComponent,
	bottomLeftComponent, bottomRightComponent, sidebarComponent}) => (
	<Fragment>
		{headerComponent}
		<div className="u-display-flex">
			<Main>
				{topComponent &&
					<Row style={{minHeight: '60vh'}}>
						<Column>
							{topComponent}
						</Column>
					</Row>
				}
				{(bottomLeftComponent || bottomRightComponent) &&
					<Row style={{minHeight: '40vh'}}>
						{bottomLeftComponent &&
							<Column
								sizes={[['XS', 12], ['LG', bottomRightComponent ? 6 : 12]]}>
								{bottomLeftComponent}
							</Column>
						}
						{bottomRightComponent &&
							<Column
								sizes={[['XS', 12], ['LG', bottomLeftComponent ? 6 : 12]]}>
								{bottomRightComponent}
							</Column>
						}
					</Row>
				}
			</Main>
			{sidebarComponent}
		</div>
	</Fragment>
);

export default DefaultTemplate;