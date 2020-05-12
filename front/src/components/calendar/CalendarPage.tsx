import React, { useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Box } from '@chakra-ui/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppState } from 'store';
import { selectFollowedShows } from 'store/user/reducers';
import { getSeasonEpisodes } from 'gateway/getSeasonEpisodes';
import { ID } from 'types/common';
import 'style/fullCalendar.scss';

interface StateProps {
  followedShows: ID[];
}

type Props = StateProps;

const CalendarPage = ({ followedShows }: Props): JSX.Element => {
  // console.log('followedShows:', followedShows);

  // Make request to get number of seasons in the show

  // Make a call to API for one show ID
  useEffect(() => {
    async function loadSeasonEpisodes() {
      const season1Details = await getSeasonEpisodes(followedShows[0], 1);
      console.log('season1Details:', season1Details);
    }

    loadSeasonEpisodes();
  }, []);

  return (
    <Box>
      <Box maxW="80%" m="30px auto 0">
        <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
      </Box>
    </Box>
  );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = (state: AppState) => ({
  followedShows: selectFollowedShows(state),
});

export default connect<StateProps, {}, {}, AppState>(mapStateToProps, {})(CalendarPage);