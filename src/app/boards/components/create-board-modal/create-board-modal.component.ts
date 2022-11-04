import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardModalService } from '../../services/board-modal.service';
import { createBoard } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-create-board-modal',
  templateUrl: './create-board-modal.component.html',
  styleUrls: ['./create-board-modal.component.scss'],
})
export class CreateBoardModalComponent {
  public form!: FormGroup;

  constructor(public boardModalService: BoardModalService, private store: Store) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public createNewBoard(): void {
    if (this.form.status === 'VALID') {
      const newBoard = this.form.value;
      this.store.dispatch(createBoard({ newBoard }));

      this.boardModalService.closeCreateBoardModal();
      this.form.reset();
    }
  }
}
