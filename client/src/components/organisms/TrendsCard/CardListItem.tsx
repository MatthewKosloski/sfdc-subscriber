import React, { Fragment } from 'react';

import { Button } from '../../../design-system/components';

import { CardListItem as CardListItemMolecule } from '../../molecules';
import { ICardListItemProps } from '../../molecules/CardListItem';

const CardListItem: React.FC<ICardListItemProps> = (props) => (
	<Fragment>
		<CardListItemMolecule {...props}>
			<Button
				variant="danger"
				small>
				Unsubscribe
			</Button>
		</CardListItemMolecule>
	</Fragment>
);

export default CardListItem;