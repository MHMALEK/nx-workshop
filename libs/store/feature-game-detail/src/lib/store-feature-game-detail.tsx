import { useParams } from 'react-router-dom';
import styles from './store-feature-game-detail.module.scss';
import { formatRating } from '@frontmen/store/util-formatters-2';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { Button, CardActions, CardHeader, CardMedia } from '@material-ui/core';

type TParams = { id: string };

export const StoreFeatureGameDetail = () => {
  const { id } = useParams();

  const [state, setState] = useState<{
    data: any;
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: {},
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    const gameId = id;
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, [id]);

  return (
    <div className={styles['container']}>
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data == null ? (
        ''
      ) : (
        <Card>
          <CardHeader title={state.data.name}></CardHeader>
          {state.data.image ? (
            <CardMedia
              className={styles['game-card-media']}
              image={state.data.image}
              title={state.data.name}
            />
          ) : null}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.data.description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={styles['game-rating']}
            >
              <strong>Rating:</strong> {formatRating(state.data.rating)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">
              Buy
            </Button>
            <Button variant="contained">Share</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default StoreFeatureGameDetail;
