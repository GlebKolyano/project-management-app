import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { INITIAL_EMPTY_STRING_VALUE } from '../../../constants/board.constants';
import { ITask } from '../../models/tasks.models';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent {
  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amountOfTasks: number },
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(INITIAL_EMPTY_STRING_VALUE, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl(INITIAL_EMPTY_STRING_VALUE, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      userId: new FormControl<string | null>(null),
      users: new FormControl<string[]>([]),
    });
  }

  public onTasksUsersChange(userIdList: string[] | null): void {
    if (userIdList) this.form.get('users')?.setValue(userIdList);
  }

  public get newTask(): ITask {
    return this.form.value;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
