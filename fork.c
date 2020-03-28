#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
    pid_t status;
    
    status = fork();
    if (status == 0){
        
        printf("I am child process and going to execute ls command\n");
        
        char * argv[4];
        argv[0] = "/bin/ls";
        argv[1] = "-l";
        argv[2] = "/home";
        argv[3] = NULL;
        execv("/bin/ls",argv);
    }
    else if(status > 0){
        
        printf("I am parent process and waiting child process %d\n",status);
        wait(&status);
        
        printf("Child process ended\n");
    }
    else {
        
        printf("Creation of child process is unsuccessful\n");
    }
    return 0;
}

