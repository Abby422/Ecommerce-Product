import { useState } from 'react';
import { api, errorMessage } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { Spinner, ErrorMessage, Empty } from '../../common/Status';

const SetAdmin = () => {
  const { data: users, status, error, reload } = useAsync(() => api.getUsers(), [], {
    initialData: [],
    fallbackError: 'Could not load users.',
  });
  const [pendingId, setPendingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  // The old component fired setAdmin from a useEffect keyed on [role, id],
  // which meant it POSTed with undefined values on first mount. The role change
  // is now an explicit event handler.
  const handleRoleChange = async (userID, role) => {
    setPendingId(userID);
    setActionError(null);
    try {
      await api.setAdmin({ userID, role });
      reload();
    } catch (err) {
      setActionError(errorMessage(err, 'Could not change that role.'));
    } finally {
      setPendingId(null);
    }
  };

  if (status === 'loading') return <Spinner label="Loading users…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="setAdmin">
      <div className="title">
        <p>Set Admin</p>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {users.length === 0 ? (
        <Empty message="No users registered yet." />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Deleted</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.User_Id}>
                  <td>{user.Email}</td>
                  <td>{user.Name}</td>
                  <td>{user.IsDeleted ? 'Yes' : 'No'}</td>
                  <td>
                    <label className="visually-hidden" htmlFor={`role-${user.User_Id}`}>
                      Role for {user.Email}
                    </label>
                    <select
                      id={`role-${user.User_Id}`}
                      value={user.User_role ?? 'User'}
                      disabled={pendingId === user.User_Id}
                      onChange={(event) => handleRoleChange(user.User_Id, event.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SetAdmin;
