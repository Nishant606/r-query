import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data?.channelId;
  const { data: channelData } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );
  console.log(channelData);
  return (
    <div>
      <div> Dependent Queries</div>
      <h1>List of Courses</h1>
      <ol>
        {channelData?.data?.courses?.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ol>
    </div>
  );
};
