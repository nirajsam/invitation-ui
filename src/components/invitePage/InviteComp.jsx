import React from 'react';
import { useLocation } from 'react-router-dom';
import CoupleDetail from '../CoupleDetailPage/CoupleDetail';
import CeremonyDetails from '../CeremonyDetails/CeremonyDetails';
import Welcome from '../WelcomePage/Welcome';
import './invite.css'
import content_en from '../../content/ContentEng'
import content_hi from '../../content/ContentHin'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Invite = () => {
  // useParams hook from react-router-dom to get the parameter from the URL
  const query = useQuery();

  const name = query.get('n') || '';
  const address = query.get('a') || ''; 
  const guesttype = query.get('t') || '';
  const langHindi = query.get('l') || false;
  const content = langHindi? content_hi: content_en

  return (
    <div className='invite-card'>
      <section><Welcome guestName = {name} guestAddress={address} guestType={guesttype} content={content.WelcomeDetails} /></section>
      <section className='page2'>
        <CoupleDetail content={content.CoupleDetails}/>
        <CeremonyDetails content={content.CeremonyDetails} guestDetail={[name,address,guesttype]}/>
        <div className='creator'>created by Niraj ❤️</div>
      </section>
      
    </div>
  );
};

export default Invite;