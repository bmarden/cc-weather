import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Historical = () => {
  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.histWx.tempData);
  const tempDataStatus = useSelector((state) => state.histWx.tempDataStatus);
  let options;
  let content;

  if (tempDataStatus === 'succeeded') {
    const tData = tempData[1].map(Number);
    console.log(tData);
    options = {
      title: {
        text: 'My chart',
      },
      series: [
        {
          name: 'Minimum Temperature',
          data: tData,
        },
      ],
    };
    content = <HighchartsReact highcharts={Highcharts} options={options} />;
  } else {
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return <>{content}</>;
};

export default Historical;
