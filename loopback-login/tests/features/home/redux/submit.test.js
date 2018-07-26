import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SUBMIT_BEGIN,
  HOME_SUBMIT_SUCCESS,
  HOME_SUBMIT_FAILURE,
  HOME_SUBMIT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  submit,
  dismissSubmitError,
  reducer,
} from '../../../../src/features/home/redux/submit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/submit', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when submit succeeds', () => {
    const store = mockStore({});

    return store.dispatch(submit())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SUBMIT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SUBMIT_SUCCESS);
      });
  });

  it('dispatches failure action when submit fails', () => {
    const store = mockStore({});

    return store.dispatch(submit({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SUBMIT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SUBMIT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubmitError', () => {
    const expectedAction = {
      type: HOME_SUBMIT_DISMISS_ERROR,
    };
    expect(dismissSubmitError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SUBMIT_BEGIN correctly', () => {
    const prevState = { submitPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SUBMIT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitPending).toBe(true);
  });

  it('handles action type HOME_SUBMIT_SUCCESS correctly', () => {
    const prevState = { submitPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SUBMIT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitPending).toBe(false);
  });

  it('handles action type HOME_SUBMIT_FAILURE correctly', () => {
    const prevState = { submitPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SUBMIT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitPending).toBe(false);
    expect(state.submitError).toEqual(expect.anything());
  });

  it('handles action type HOME_SUBMIT_DISMISS_ERROR correctly', () => {
    const prevState = { submitError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SUBMIT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitError).toBe(null);
  });
});

