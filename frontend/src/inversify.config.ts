import 'reflect-metadata';

import { Container } from 'inversify';
import { ReactTestManager } from './features/tests/testManager';
import { ApiClient } from './api/client';

const container = new Container();
container.bind<ReactTestManager>(ReactTestManager).toSelf().inSingletonScope();
container.bind<ApiClient>(ApiClient).toSelf().inSingletonScope();

export default container;
