/*
 * Copyright 2020 RoadieHQ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useAsyncFn } from 'react-use';
import { buildKiteApiRef } from '../api';

export const useSingleBuild = ({owner, repo, buildNumber}: {owner: string, repo: string, buildNumber: number}) => {
  const api = useApi(buildKiteApiRef);
  const errorApi = useApi(errorApiRef);


  const [state, fetchBuildData] = useAsyncFn(
    async () => {
      try {
        return await api.getSingleBuild(
          owner,
          repo,
          buildNumber,
        )
      } catch (e:any) {
        errorApi.post(e);
        return Promise.reject(e);
      }
    }, [],
  );

  return { 
    loading: state.loading,
    value: state.value,
    error: state.error,
    fetchBuildData,
  };
}
