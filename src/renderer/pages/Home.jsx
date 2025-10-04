import styled from 'styled-components';
import Divider from 'renderer/components/Divider';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import ExerciseSVG from '../icons/exercise.svg';
import BinocularsSVG from '../icons/binoculars.svg';
import WaterSVG from '../icons/water.svg';

const Box = styled.div``;

const Card = styled(Flexbox)`
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: var(--border-radius-2);
  border: 1px solid var(--neutral-180);
`;

const Icon = styled.img`
  align-self: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export default function Home() {
  return (
    <Box>
      <Flexbox padding={24}>
        <Typography variant="h3">Take a break</Typography>
      </Flexbox>
      <Divider />
      <Flexbox gap={16} padding={24}>
        <Card>
          <Icon width="96px" height="96px" src={ExerciseSVG} />
          <Typography variant="h4">Move your body</Typography>
          <Typography>
            Stand up, stretch, and walk around. Get your blood flowing and shake
            off the stiffness from sitting.
          </Typography>
        </Card>
        <Card>
          <Icon width="96px" height="96px" src={BinocularsSVG} />
          <Typography variant="h4">Rest Your Eyes</Typography>
          <Typography>
            Look at something 20 meters away or close your eyes. Give your eyes
            a break from screen glare.
          </Typography>
        </Card>
        <Card>
          <Icon width="96px" height="96px" src={WaterSVG} />
          <Typography variant="h4">Hydrate & Reset</Typography>
          <Typography>
            Drink water, take deep breaths, and step away mentally. Clear your
            mind for better focus.
          </Typography>
        </Card>
      </Flexbox>
    </Box>
  );
}
