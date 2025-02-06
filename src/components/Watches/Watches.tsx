import React, {useState} from 'react';
import Watch from '../Watch/Watch.tsx';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from "uuid";


interface IWatchList {
  id: string;
  name: string;
  zone: string;
}

const initialWatches = [
   { id: "99", name: "Moscow", zone: "Europe/Moscow" },
   { id: "77", name: "Yekaterinburg", zone: "Asia/Yekaterinburg" },
   { id: "55", name: "Berlin", zone: "Europe/Berlin" },
];


export function Watches() {
  const [watches, setWatch] = useState<IWatchList[]>(initialWatches);

  const [form, setForm] = useState({
    watchName: "", timezoneName: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const { watchName, timezoneName } = e.target;
    const timeZone = checkTimeZone(timezoneName.value);
    if (timeZone) {
      setWatch((p) => [...p, { id: uuidv4(), name: watchName.value, zone: timeZone}]);
      setForm({ watchName: "", timezoneName: ""});
    }
  }

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const checkTimeZone = (prm) => {
    if (prm.trim().length  === 0) return false;
    const listTz = moment.tz.names();
    const srTZ = listTz.filter( item => item.toLowerCase().includes(`${prm.toLowerCase()}`)); 
    return srTZ.length > 0 ? srTZ[0] : false
  }

  const removeItem = (prid:string) => {
    setWatch(watches.filter((b) => b.id !== prid));
   }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <ul className="formitems">
          <li>
            <label htmlFor="watch-name">Название</label>
            <input id="watch-name" name="watchName"  autoComplete="off" onChange={handleinput} />
          </li>
          <li>
            <label htmlFor="timezone-name">Временная зона</label>
            <input id="timezone-name" name="timezoneName" autoComplete="off" onChange={handleinput}  />
          </li>
          <li>
            <button>Добавить</button>
          </li>
        </ul>
      </form>
      { watches.map((item) =>  <Watch key={item.id} removeItem={() => removeItem(item.id)} {...item}  />   )}
    </>
  );
};


