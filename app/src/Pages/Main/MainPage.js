import React, { useEffect, useState } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { SERVER_URL } from '../../App';
import InsertAge from '../../Components/InsertAge';

const MainPage = () => {
  const [imgURL, setImgURL] = useState('');

  const fetchImage = async () => {
    const resp = await axios.get(`${SERVER_URL}/api/imgs/random`);
    setImgURL(resp.data.imgURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <Grid textAlign='center' className='main-page' verticalAlign='middle'>
      <Grid.Row stretched columns={2}>
        <Grid.Column>
          <Image centered src={imgURL} size='medium' />
        </Grid.Column>
        <Grid.Column className='main-page__insert-age'>
          <InsertAge fetchImage={fetchImage} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MainPage;
