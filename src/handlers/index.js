import { Store } from '@rebelstack-io/metaflux';
import main from './MainHandler';

const { MainDefaultState, MainHandler } = main;

global.TPGstorage = new Store(
	{Main: MainDefaultState},
	MainHandler
);
