import { TestBed } from '@angular/core/testing';

import { ConversationFirestoreService } from './conversation-firestore.service';

describe('ConversationFirestoreService', () => {
  let service: ConversationFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
