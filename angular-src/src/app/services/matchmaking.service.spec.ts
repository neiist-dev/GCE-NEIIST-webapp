import { TestBed, inject } from '@angular/core/testing';

import { MatchmakingService } from './matchmaking.service';

describe('MatchmakingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchmakingService]
    });
  });

  it('should be created', inject([MatchmakingService], (service: MatchmakingService) => {
    expect(service).toBeTruthy();
  }));
});
