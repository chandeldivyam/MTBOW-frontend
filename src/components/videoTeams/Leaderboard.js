import React, { useEffect, useState } from 'react';
import Avatar from 'avataaars'
import {List} from 'antd'
import { useNavigate } from "react-router-dom";
import { GiImperialCrown } from "react-icons/gi";

const randomAvatarGenerator = () => {
    const configsKeys = Object.keys(configs);
    const options = { }
    const keys = [...configsKeys]
    keys.forEach(key => {
        const configArray = configs[key];
        options[key] = configArray[Math.floor(Math.random()*configArray.length)];
    })    
    return options; 
}

const myUserId = parseInt(localStorage.getItem("user_id"))

function customSort(a, b) {
  if (a.user_id === myUserId) return -1;
  if (b.user_id === myUserId) return 1;
  return parseInt(a.rank) - parseInt(b.rank);
}

const Leaderboard = ({leaderboard, contest_id}) => {
    let navigate = useNavigate();
    let sortedLeaderboard = leaderboard.sort(customSort)
    const [cachedAvatars, setCachedAvatars] = useState({});

    useEffect(() => {
      const avatars = { ...cachedAvatars };
      sortedLeaderboard.forEach((item) => {
        if (!avatars[item.user_id]) {
          avatars[item.user_id] = randomAvatarGenerator();
        }
      });
      setCachedAvatars(avatars);
    }, [contest_id]);
    return (
      <>
        <p className="text-center text-slate-400">
          Click on the player to view their teams
        </p>
        <List
          itemLayout="horizontal"
          dataSource={sortedLeaderboard}
          renderItem={(item) => (
            <List.Item
              className={`${
                item.card_type
                  ? `bg-[${colorObject[item.card_type]}]`
                  : ""
              } border-2 ${
                item.rank <= 50 && !item.card_type ? "border-green-500" : "border-gray-200"
              } m-2.5 p-2`}
              onClick={() => {
                navigate(`/videoTeamOther/${contest_id}/${item.user_id}`);
              }}
              extra={
                <div
                  className={`${
                    item.card_type ? `text-lg text-white` : `text-lg`
                  }`}
                >
                  #{item.rank}
                </div>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ width: "50px", height: "50px" }}
                    avatarStyle="Circle"
                    {...cachedAvatars[item.user_id]}
                  />
                }
                title={
                  <h1 className={item.card_type ? `text-white` : ""}>
                    {item.name}
                  </h1>
                }
                description={
                  <div
                    className={`${
                      item.card_type ? `text-slate-100` : ""
                    }`}
                  >
                    Total Points: {item.total_points}
                    {item.rank <= 50 && !item.card_type && (
                      <span className="ml-2 text-green-500">
                        (Winning)
                      </span>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </>
    );    
}

const colorObject = {
  "GOLDEN": "#FFD700",
  "SILVER": "#C0C0C0",
  "BRONZE": "#CD7F32",
  "BLUE": "#368BC1"
}

const configs = {
    topType: [
      'NoHair',
      'Eyepatch',
      'Hat',
      'Hijab',
      'Turban',
      'WinterHat1',
      'WinterHat2',
      'WinterHat3',
      'WinterHat4',
      'LongHairBigHair',
      'LongHairBob',
      'LongHairBun',
      'LongHairCurly',
      'LongHairCurvy',
      'LongHairDreads',
      'LongHairFrida',
      'LongHairFro',
      'LongHairFroBand',
      'LongHairNotTooLong',
      'LongHairShavedSides',
      'LongHairMiaWallace',
      'LongHairStraight',
      'LongHairStraight2',
      'LongHairStraightStrand',
      'ShortHairDreads01',
      'ShortHairDreads02'
    ],
    accessoriesType: [
      'Blank',
      'Kurt',
      'Prescription01',
      'Prescription02',
      'Round',
      'Sunglasses',
      'Wayfarers'
    ],
    hatColor: [
      'Black',
      'Blue01',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
      'White'
    ],
    hairColor: [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
      'PastelPink',
      'Platinum',
      'Red',
      'SilverGray'
    ],
    facialHairType: [
      'Blank',
      'BeardMedium',
      'BeardLight',
      'BeardMajestic',
      'MoustacheFancy',
      'MoustacheMagnum'
    ],
    facialHairColor: [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
      'Platinum',
      'Red'
    ],
    clotheType: [
      'BlazerShirt',
      'BlazerSweater',
      'CollarSweater',
      'GraphicShirt',
      'Hoodie',
      'Overall',
      'ShirtCrewNeck',
      'ShirtScoopNeck',
      'ShirtVNeck'
    ],
    clotheColor: [
      'Black',
      'Blue01',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
      'White'
    ],
    graphicType: [
      'Bat',
      'Cumbia',
      'Deer',
      'Diamond',
      'Hola',
      'Pizza',
      'Resist',
      'Selena',
      'Bear',
      'SkullOutline',
      'Skull'
    ],
    eyeType: [
      'Close',
      'Default',
      'Dizzy',
      'EyeRoll',
      'Happy',
      'Hearts',
      'Side',
      'Squint',
      'Surprised',
      'Wink',
      'WinkWacky'
    ],
    eyebrowType: [
      'Angry',
      'AngryNatural',
      'Default',
      'DefaultNatural',
      'FlatNatural',
      'RaisedExcited',
      'RaisedExcitedNatural',
      'SadConcerned',
      'SadConcernedNatural',
      'UnibrowNatural',
      'UpDown',
      'UpDownNatural'
    ],
    mouthType: [
      'Concerned',
      'Default',
      'Disbelief',
      'Eating',
      'Grimace',
      'Sad',
      'ScreamOpen',
      'Serious',
      'Smile',
      'Tongue',
      'Twinkle',
      'Vomit'
    ],
    skinColor: [
      'Tanned',
      'Yellow',
      'Pale',
      'Light',
      'Brown',
      'DarkBrown',
      'Black'
    ]
}

export default Leaderboard