import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actionValidateToken} from '../../state_manager/home/actions';

/**
 * An appwide check on the status of the user's token. This will be scafolded in the application
 * so that the state of authentication is determined before hand even before the player begins
 * interacting with the application.
 *
 * If there is need to validate user requests later on, it will be done on per request basis,
 * and then the tokens can be invalidated.
 */
export const Authenticator = ({children}: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(actionValidateToken());
  }, []);

  return <>{children}</>;
};
