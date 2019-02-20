import reducer from '../listReducer';
import types from '../types';

describe('applications module list reducer', () => {
  test('sets saving to true on fetch attempt', () => {
    const action = { type: types.FETCH_APPLICATIONS_ATTEMPT };
    expect(reducer({ saving: false }, action).saving).toBe(true);
  });

  test('sets saving to false on fetch success', () => {
    const action = { type: types.FETCH_APPLICATIONS_SUCCESS };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets saving to false on fetch failure', () => {
    const action = { type: types.FETCH_APPLICATIONS_FAILURE };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets list to payload on fetch success', () => {
    const apps = [{}, {}];
    const action = { type: types.FETCH_APPLICATIONS_SUCCESS, payload: apps };
    expect(reducer(undefined, action).list).toBe(apps);
  });

  test('sets error to payload on fetch failure', () => {
    const err = new Error('error');
    const action = { type: types.FETCH_APPLICATIONS_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toEqual(err);
  })
});