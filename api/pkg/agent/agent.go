package agent

type Agent struct {
}

func New() *Agent {
	return &Agent{}
}
func (a *Agent) httpHandler() error {
	return nil
}

func (a *Agent) UploadWithPrompt() error {
	return nil
}
