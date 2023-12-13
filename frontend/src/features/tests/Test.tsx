import { Box, MenuItem, Select, Typography } from '@mui/material';
import container from '../../inversify.config';
import { ReactTestManager } from './testManager';
import { TestTranslator } from './TestTranslator';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectTestId, setTestId } from './testSlice';


function registerAllTests() {
  const manager = container.resolve(ReactTestManager);
  manager.registerTest('TestTranslator', () => <TestTranslator />);
}

export function Test() {
  const manager = container.resolve(ReactTestManager);
  const select = useAppSelector(selectTestId);
  const dispatch = useAppDispatch();
  const test = manager.tests.find((t) => t.name === select) || manager.tests[0];
  const tests = manager.tests.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Box p={2} sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: 2 }}>
          <Typography variant="h5">选择测试</Typography>
        </Box>
        <Select value={select} onChange={(e) => dispatch(setTestId(e.target.value))}>
          {tests.map((test, index) => (
            <MenuItem key={index} value={test.name}>
              {test.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'auto' }}>{test.render()}</Box>
    </Box>
  );
}

registerAllTests();