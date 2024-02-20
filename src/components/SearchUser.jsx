import React, { useState } from 'react';

const SearchUser = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSearchInputs, setShowSearchInputs] = useState(true);

  const handleSearch = () => {
    // Perform search logic here
    // Set selectedUser based on search result
    setSelectedUser(/* search result */);
    setShowSearchInputs(false);
  };

  const handleReset = () => {
    setSearchValue('');
    setSelectedUser(null);
    setShowSearchInputs(true);
  };

  return (
    <div>
      {showSearchInputs && (
        <div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {!showSearchInputs && selectedUser && (
        <div>
          <h2>Selected User: {selectedUser.name}</h2>
          {/* Render additional user details here */}
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
