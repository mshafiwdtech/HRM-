import Routes from './routes'
import { Snackbar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css';

export default function App() {
  const { isSnackbarVisible, snackbarMessage } = useSelector(state => state.notification)
  return (
    <div>
      <Routes />
      <Snackbar
        open={isSnackbarVisible}
        message={snackbarMessage}
        key={`top right`}
      />
    </div>
  );
}