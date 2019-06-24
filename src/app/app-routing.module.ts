import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TwitterStatsComponent} from './containers/twitter-stats/twitter-stats.component';
import {TweetComponent} from './containers/tweet/tweet.component';

const routes: Routes = [
  {path: 'twitterstats', component: TwitterStatsComponent},
  {path: 'tweet/:id', component: TweetComponent},
  {path: '', redirectTo: '/twitterstats', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
