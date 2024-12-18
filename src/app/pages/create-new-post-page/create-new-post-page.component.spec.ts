import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPostPageComponent } from './create-new-post-page.component';

describe('CreateNewPostPageComponent', () => {
  let component: CreateNewPostPageComponent;
  let fixture: ComponentFixture<CreateNewPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPostPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
