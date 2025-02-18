import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Collapse,
} from 'reactstrap';

const UsersTable = ({ data, theUser,handleCheck }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [users, setUsers] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    // Load users from localStorage
    // const savedUsers = localStorage.getItem('users');
    // if (savedUsers) {
    //   setUsers(JSON.parse(savedUsers));
    // }
  }, []);

  // console.log("theUser", theUser)
  

  useEffect(() => {
    // Group the data by username and match drivers with user suffixes
    let username= theUser;
    console.log("username", theUser);
    const grouped = {[username]: { username: username, bindings: [],id:username}};

    // // First, organize localStorage users
    // users.forEach(user => {
    //   grouped[theUser] = {
    //     username: theUser,
    //     bindings: user.bindings || [],
    //     id: user.id
    //   };
    // });

    // Then, process gRPC data and match by suffix
    data.forEach(item => {
      console.log(item);
      const accountInfo = parseAccountInfo(item.accountInfo);
      const path_fragments = item.path.split("/");
      const username = path_fragments[2];




      // Find matching user by suffix
      const matchingUser = Object.values(grouped).find(user =>
        item.driverName.toLowerCase().endsWith(user.username.toLowerCase())
      );

      if (matchingUser) {
        // Add to existing user's bindings
        grouped[theUser].bindings.push({
          ...item,
          accountInfo: accountInfo
        });
      } else if (!grouped[username]) {
        // Create new user entry if no match found
        // grouped[username] = {
        //   username: username,
        //   bindings: [{
        //     ...item,
        //     accountInfo: accountInfo
        //   }]
        // };
      } else {
        // Add to existing user's bindings
        grouped[username].bindings.push({
          ...item,
          accountInfo: accountInfo
        });
      }
    });

    setGroupedData(grouped);
  }, [data, users, theUser]);

  const toggleRow = (username) => {
    setExpandedRows(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const parseAccountInfo = (info) => {
    try {
      return JSON.parse(info);
    } catch (e) {
      return { error: 'Invalid JSON', name: 'Unknown', amount: 0 };
    }
  };

  const getUnitId = (username) => {
    return username ? `${username}@myunits` : 'N/A';
  };

  const navigateToBindForm = (username) => {
    localStorage.setItem('selectedUser', username);
    navigate('/admin/user/bind')
  };

  return (
    <Card className="shadow users mx-auto" style={{ maxWidth: '90%', minWidth: '800px' }}>
      <CardHeader className="border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">User</h3>
          {/* <Button
            className='navigateToBindCTA-2'
            color="primary"
            onClick={() => window.location.href = '/admin/user/add'}
          >
            <i class="fa-solid fa-user-plus"></i>
            &nbsp;&nbsp;Add User
          </Button> */}
        </div>
      </CardHeader>
      <CardBody>
        <Table responsive hover className="align-items-center">
          <thead>
            <tr>
              <th>Units ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([username, userData], index) => (
              <React.Fragment key={username}>
                <tr onClick={() => toggleRow(username)}>
                  <td>
                    <span className="text-primary">
                      {getUnitId(username)}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
{/* 
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => toggleRow(username)}
                        title={expandedRows[username] ? "Hide Details" : "Show Details"}
                      >
                        <i class={`fa-solid ${expandedRows[username] ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </Button> */}
                      <Button
                            color="primary"
                            size="sm"
                            onClick={() => navigateToBindForm(username)}
                            title='Link Account'
                            style={{ width: '130px', height: '35px' }}
                          >
                            <i className='linkIcon' class="fa-solid fa-link"></i>
                            &nbsp;&nbsp;
                            Link Account
                          </Button>
                      <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                              const updatedUsers = users.filter(user => user.username !== username);
                              localStorage.setItem('users', JSON.stringify(updatedUsers));
                              setUsers(updatedUsers);
                            }}
                            style={{ width: '130px', height: '35px' }}
                          >
                            <i class="fa-solid fa-trash"></i>
                            &nbsp;&nbsp;
                            Delete User
                          </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5" className="p-0">
                    <Collapse isOpen={expandedRows[username]}>
                      <div className='sub-table-container'>
                        <Table responsive hover className="align-items-center sub-table">
                          <thead>
                            <tr>
                              <th>User Name</th>
                              <th>Token Driver Name</th>
                              <th>Version</th>
                              <th>Path</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.bindings.map((binding, index) => (
                              <tr key={binding.path || index}>
                                <td>{username}</td>
                                <td>
                                  <Badge color="info" className="badge-lg">
                                    {binding.driverName}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge color="success" className="badge-lg">
                                    {binding.driverVersion}
                                  </Badge>
                                </td>
                                <td>
                                  <span className="text-primary">{binding.path || 'Not set'}</span>
                                </td>
                              </tr>
                            ))}
                            {userData.bindings.length === 0 && (
                              <tr>
                                <td colSpan="4" className="text-center">
                                  No bindings available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default UsersTable;
