import { Button } from "react-bootstrap";
import './SideContent.css';

const SideContent = ({
  channels = [],
  friends = [],
  onSelect,
  onFindFriends,
  onCreateChannel,
  view
}) => {
  
  console.log('Channels: ',channels);
  console.log('Friends: ',friends);


  return (
    <div className="w-1/4 h-full p-4">
      <h2 className="font-bold text-lg mb-4">Friends</h2>
      <div className="mb-8">
        {Array.isArray(friends) && friends.map((friend) => (
          <div
            key={friend.otherUser.id}
            onClick={() => onSelect(friend.id)}
            className="cursor-pointer p-2"
          >
            {friend.otherUser.email}
          </div>
        ))}
      </div>
      <Button
        variant="dark"
        onClick={onFindFriends}
        className="bg-blue-500 mt-3 text-white px-4 py-2 rounded w-full"
      >
        Find Friends
      </Button>
      <h2 className="font-bold text-lg mb-4 mt-4">Channels</h2>
      <div className="d-flex flex-wrap justify-content-start gap-3">
        {Array.isArray(channels) && channels.map((channel) => ( 
          <Button
            className="circle-btn rounded-circle d-flex justify-content-center align-items-center border-0 text-white bg-success"
            key = {channel.id}
            onClick={() => onSelect(channel.id)}
            title={channel.name} >{channel.name.charAt(0).toUpperCase()}
          </Button>
        ))}
      </div>
      <Button
        variant="dark"
        onClick={onCreateChannel}
        className="bg-blue-500 mt-3 text-white px-4 py-2 rounded w-full mb-4"
      >
        Create Channel
      </Button>
      
    </div>
  );
};

export default SideContent;