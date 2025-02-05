import React from 'react';
import { v4 as uuidv4 } from "uuid";
import Watch from '../Watch/Watch.tsx'




export function Watches() {

  return (
    <>
      <form  >
        <ul className="formitems">
          <li>
            <label htmlFor="watch-name">Название</label>
            <input id="watch-name" name="watch-name"  autoComplete="off" />
          </li>
          <li>
            <label htmlFor="timezone-name">Временная зона</label>
            <input id="timezone-name" name="timezone-name" autoComplete="off" />
          </li>
          <li>
            <button>Добавить</button>
          </li>
        </ul>
      </form>
      { ['Moscow', 'Ekat', 'Tokyo'].map(item => 
         <Watch city={item} />
      )}
    </>
  );
};


