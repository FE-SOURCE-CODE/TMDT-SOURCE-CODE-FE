import { Link } from 'react-router-dom';


function CodeCard({ c, kieu }: any) {
    const ctLink = '/code/' + c.maCode;
    const demoLink = '/live-demo/' + c.maCode;
    const demoCls = c.linkDemo ? 'btn btn-outline-danger btn-sm' : 'btn btn-outline-secondary btn-sm disabled';

    ;
}
export default CodeCard;
